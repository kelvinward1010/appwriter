import { posts } from "@/pages/topics/data";
import { IPost } from "@/types/post";
import { Row, Typography } from "antd";
import styles from "./PostPreview.module.scss";
import { Error404 } from "../error/404";

const { Text, Title } = Typography;

interface PostPreviewProps {
    id: string | number;
}

export function PostPreview(data: PostPreviewProps) {
    const dataPost: IPost | undefined = posts.find((p) => p.id === data.id);

    return (
        <div className={styles.container}>
            {dataPost ? (
                <>
                    <Title level={4}>{dataPost?.title}</Title>
                    <Text>{dataPost?.time_created}</Text>
                    <Row className={styles.content}>
                        <Text>{dataPost?.content}</Text>
                    </Row>
                </>
            ) : (
                <Error404 />
            )}
        </div>
    );
}