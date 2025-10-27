import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../services/post/post";
import { useRouter } from "next/navigation";

export function useDeletePostMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      router.push("/");
    },
  });
}
