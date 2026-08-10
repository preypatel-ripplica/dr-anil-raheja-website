import type { GetStaticPaths, GetStaticProps } from "next";
import LocalizedPage, { getLocalizedPaths, getLocalizedProps } from "@/lib/localized-page";

export const getStaticPaths: GetStaticPaths = async () => ({ paths: await getLocalizedPaths("hi"), fallback: false });
export const getStaticProps: GetStaticProps = (context) => getLocalizedProps("hi", context);
export default LocalizedPage;
