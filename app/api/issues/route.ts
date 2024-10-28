import { NextRequest, NextResponse } from "next/server";
import { string, z } from 'zod'
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

const PriorityEnum = z.enum([ "LOW", "MEDIUM", "HIGH"])
const StatusEnum = z.enum(["BACKLOG", "IN_PROGRESS", "REVIEW", "COMPLETED"]);

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required!").max(255),
    priority: PriorityEnum.refine(value => value !== undefined, {
        message: "Priority is required!",
    }),
    description: z.string().min(1, "Description is required"),
    status: StatusEnum.optional(),
    important_dates: z.array(z.string())
})



export async function POST(request: NextRequest){
   const body = await  request.json()
   const validation = createIssueSchema.safeParse(body)
   if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
}
   const newIssue = await prisma.issue.create({
    data:{
        title: validation.data.title, 
        description: validation.data.description,
        priority: validation.data.priority,
        status: validation.data.status ?? "BACKLOG",
        important_dates: validation.data.important_dates ?? []
    }
   })

   return NextResponse.json(newIssue, {status: 201})
}

export async function GET(request: NextRequest) {

    try {
        const issues = await prisma.issue.findMany()
        return NextResponse.json(issues, {status:200})
    } catch (error) {
        console.error("Failed to fetch issues")
        return NextResponse.json({error: 'Failed to fetch issues'}, {status:500})
    }
 
}

