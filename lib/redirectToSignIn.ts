import { redirect } from "next/navigation";

export function RedirectToSignIn(){
    return redirect('/sign-in')
}