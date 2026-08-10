import type { GetStaticPaths, GetStaticProps } from "next";
import LocalizedPage, { getLocalizedPaths, getLocalizedProps } from "@/lib/localized-page";

export const getStaticPaths: GetStaticPaths = async () => ({ paths: await getLocalizedPaths("ru"), fallback: false });
export const getStaticProps: GetStaticProps = (context) => getLocalizedProps("ru", context);
export default LocalizedPage;
