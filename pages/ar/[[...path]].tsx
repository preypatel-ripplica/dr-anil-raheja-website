import type { GetStaticPaths, GetStaticProps } from "next";
import LocalizedPage, { getLocalizedPaths, getLocalizedProps } from "@/lib/localized-page";

export const getStaticPaths: GetStaticPaths = async () => ({ paths: await getLocalizedPaths("ar"), fallback: false });
export const getStaticProps: GetStaticProps = (context) => getLocalizedProps("ar", context);
export default LocalizedPage;
