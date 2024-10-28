import { NextRequest, NextResponse } from "next/server"
import {PrismaClient} from "@prisma/client"
import { createIssueSchema } from "../route"

const prisma = new PrismaClient()

export async function GET(request: NextRequest){

    const {pathname} = new URL(request.url)
    const idMatch = pathname.match(/\/api\/issues\/([^/]+)/)
    if(idMatch){
    try {
        const issue = await prisma.issue.findUnique({
            where:{id: idMatch[1]}
        })
        if(issue){
            return NextResponse.json(issue, {status:200})
        }else{
            return NextResponse.json({error: 'issue not found'}, {status: 404})
        }
    } catch (error) {
        console.log('failed to fetch issue')
        return NextResponse.json({error: 'Failed to fetch issue'})
    }
}
}

export async function PUT(request:NextRequest){
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop()

    const body =  await request.text()
    let parsedBody 

    try {
        parsedBody = await JSON.parse(body)
    } catch (error) {
        parsedBody = body
    }
    

   if(typeof parsedBody === 'object' ){
    try {
        const validation = createIssueSchema.safeParse(parsedBody)

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }
        const updatedIssue = await prisma.issue.update({
            where:{id},
            data:{
                ...validation.data,
                updatedAt: new Date()
            }
        })
        return NextResponse.json(updatedIssue, {status: 200})
    } catch (error) {
        console.error('Error updating issue', error)
        return NextResponse.json({error: "Failed to update Issue"}, {status:500})
    }
   }else if( typeof parsedBody === 'string'){

    try {
        const statusValue = parsedBody as "BACKLOG" | "IN_PROGRESS" | "REVIEW" | "COMPLETED"
        
        const updatedIssue = await prisma.issue.update({
            where: {id},
            data:{
                status: statusValue,
                updatedAt: new Date()
            }
        })
        return NextResponse.json(updatedIssue, { status: 200 });
    } catch (error) {
        console.error('Error updating issue', error);
        return NextResponse.json({ error: "Failed to update Issue" }, { status: 500 });
    }
   }
}

export async function DELETE(request: NextRequest){
    const url = new URL(request.url)
    const id = url.pathname.split("/").pop()
    if(!id){
        return NextResponse.json({error: "Id not found"}, {status: 404})
    }
    try {
        const deleteItem = await prisma.issue.delete({
            where:{id}
        })
        return NextResponse.json(deleteItem, {status: 201})
    } catch (error) {
        console.log("Error in deleteing the issue", error)
        return NextResponse.json({error: "Failed to Delete an Issue"}, {status: 500})
    }
}