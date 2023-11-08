import { NextResponse } from "next/server"
//managed private routes using middleware based on LoggedInUser
export default function middleware(req) {
let verify = req.cookies.get('LoggedInUser')
let url = req.url
//if user is Logged in then user can't visit '/login' and '/signup
if(verify && (url === "http://localhost:3000/auth/login" || url === "http://localhost:3000/auth/signup")){
    return NextResponse.redirect("http://localhost:3000/auth/profile")
}
//if user is not Logged in then user can't visit '/products' and '/profile
if(verify === undefined   && (url.includes("/products") || url.includes("/profile"))){
    return NextResponse.redirect("http://localhost:3000/auth/login")
}
}