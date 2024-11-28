import ErrorHandler from "@/app/components/Error/ErrorHandler";
import RefetchPage from "@/app/components/Error/_components/RefetchPage/RefetchPage";
import { decode } from "next-auth/jwt";
import { headers } from "next/headers";

export default async function NotFound() {

    return (
        <>
            <RefetchPage refetch={() => window.location.reload()}/>
            <ErrorHandler message="존재하지 않는 유저입니다." type="snackbar"/>
        </>
    );
} 