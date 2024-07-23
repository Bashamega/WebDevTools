import users from '@/db/users.json'
import { NextResponse } from 'next/server';


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    let page = parseInt(searchParams.get('page'));
    if(isNaN(page) || page < 1) {
        page = 1;
    }
    const usersPerPage = 10;
    const startIndex = (page - 1) * usersPerPage;

    if (startIndex < 0 || startIndex >= users.length) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);
    return NextResponse.json(paginatedUsers, { status: 200 });
}