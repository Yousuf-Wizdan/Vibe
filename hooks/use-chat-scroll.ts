import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number
};

export const useChatScroll = ({
    chatRef,
    bottomRef,
    count,
    loadMore,
    shouldLoadMore
}: ChatScrollProps) => {
    const [hasInitalized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current;

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;

            if (scrollTop === 0 && shouldLoadMore) {
                loadMore()
            }
        };

        if (topDiv) {
            topDiv.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (topDiv) {
                topDiv.removeEventListener('scroll', handleScroll);
            }
        }
    }, [shouldLoadMore, loadMore, chatRef])

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef.current;
        const shouldAutoScroll = () => {
            if (!hasInitalized && bottomDiv) {
                setHasInitialized(true);
                return true
            }

            if (!topDiv) {
                return false;
            }

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight

            return distanceFromBottom <= 100;
        }

        if(shouldAutoScroll()){
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: 'smooth'
                })
            }, 100)
        }

    }, [bottomRef , chatRef , count , hasInitalized])
}