import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

const PriorityEnum = z.enum([ "LOW", "MEDIUM", "HIGH"])
const StatusEnum = z.enum(["BACKLOG", "IN_PROGRESS", "REVIEW", "COMPLETED"]);

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    priority: PriorityEnum,
    status: StatusEnum.optional(),
    important_dates: z.string().optional()
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
        important_dates: validation.data.important_dates ?? ""
    }
   })

   return NextResponse.json(newIssue, {status: 201})
}