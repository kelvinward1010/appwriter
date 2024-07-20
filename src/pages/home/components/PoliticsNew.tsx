import { IBasetListPost, IPost } from "@/types/post";
import styles from "./style.module.scss";
import { Skeleton, Typography } from "antd";
import { customConditionalFeedbackHigh } from "@/components/hoc/custom-feedback.hoc";
import { CardPost } from "@/components/card-post/CardPost";
import { usePoliticsNewestPosts } from "@/services/post/newest-posts-search.service";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export function PoliticsNew() {
    const { t } = useTranslation();
    const queryFn = {
        topic: ["Politics"],
        limit: 4,
    };

    const { data: posts } = usePoliticsNewestPosts({
        data: queryFn,
        config: {},
    });

    const draftData = {
        isLoading: false,
        data: posts as IPost[],
    };

    const ListPost = customConditionalFeedbackHigh()(BaseListNews);

    return (
        <div className={styles.container}>
            <Title level={3} className={`${styles.title} ${styles.title_1}`}>
                {t("home.politics")}
            </Title>
            {posts ? (
                <ListPost data={draftData} />
            ) : (
                <Skeleton className={"skeleton-form"} active />
            )}
        </div>
    );
}

const BaseListNews: React.FC<{ data: IBasetListPost }> = ({ data }) => {
    return (
        <div className={styles.container_listnews}>
            {data?.data.map((post: IPost) => (
                <CardPost key={post._id} data={post} />
            ))}
        </div>
    );
};
