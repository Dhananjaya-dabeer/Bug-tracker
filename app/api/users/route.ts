import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'your_secret_key'; 

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const { email, password } = validation.data;

    try {
        
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            });
        } else {
          
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
            }
        }

       
        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

        return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
