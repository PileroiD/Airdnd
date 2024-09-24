export { default } from "next-auth/middleware";

const matcher = ["/trips", "/reservations", "/properties", "/favorites"];

export const config = {
    matcher,
};
