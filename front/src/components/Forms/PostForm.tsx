// Lens
import {
  ContentFocus,
  ProfileOwnedByMe,
  supportsSelfFundedFallback,
  useCreatePost,
  useSelfFundedFallback,
} from "@lens-protocol/react-web";
// React
import { toast } from "react-hot-toast";
// Next
import Image from "next/image";
// Images
import Play from "../../../public/Play.svg";
import Photo from "../../../public/Photo.svg";
// Utils
import { upload } from "../../utils/upload";
import { never } from "../../utils/utils";

export type PostComposerProps = {
  publisher: ProfileOwnedByMe;
  isModal?: boolean;
};

export default function PostForm({ publisher, isModal }: PostComposerProps) {
  const {
    execute: post,
    error: postError,
    isPending: isPosting,
  } = useCreatePost({ publisher, upload });
  const {
    execute: fallback,
    error: fallbackError,
    isPending: fallbackInProgress,
  } = useSelfFundedFallback();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get("content") as string | null) ?? never();

    const subsidizedAttempt = await post({
      content,
      contentFocus: ContentFocus.TEXT_ONLY,
      locale: "en",
    });

    if (subsidizedAttempt.isSuccess()) {
      const result = await subsidizedAttempt.value.waitForCompletion();
      if (result.isSuccess()) {
        toast.success(`Post ID: ${result.value.id}`);
        form.reset();
      }

      return;
    }

    if (supportsSelfFundedFallback(subsidizedAttempt.error)) {
      const retry = window.confirm(
        "We cannot cover the transaction costs at this time. Do you want to retry with your own MATIC?"
      );

      if (retry) {
        const selfFundedAttempt = await fallback(
          subsidizedAttempt.error.fallback
        );

        if (selfFundedAttempt.isSuccess()) {
          form.reset();
        }
      }
    }
  };

  const isPending = isPosting || fallbackInProgress;

  return (
    <form onSubmit={submit}>
      <fieldset>
        <textarea
          name="content"
          required
          disabled={isPending}
          placeholder="Write a new post"
          className="border-1 px-[12px] py-[15px] rounded-lg my-[30px] min-h-[125px] w-full"
        />
        <div
          className={`flex justify-between items-center ${
            isModal ? "" : "border-b-2"
          } pb-[44px]`}
        >
          <div className="flex flex-row gap-x-[12px]">
            <Image height={24} width={24} src={Photo.src} alt="Upload Photo" />
            <Image height={24} width={24} src={Play.src} alt="Upload Video" />
          </div>
          <button
            className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm py-[9px] px-[30px]"
            type="submit"
            disabled={isPending}
          >
            Create Post
          </button>
        </div>

        {!isPosting && postError && <pre>{postError.message}</pre>}
        {!fallbackInProgress && fallbackError && (
          <pre>{fallbackError.message}</pre>
        )}
      </fieldset>
    </form>
  );
}
