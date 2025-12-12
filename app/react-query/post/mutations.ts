import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deletePost } from "../../services/post/post";

export function useDeletePostMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      router.push("/");
    },
  });
}
