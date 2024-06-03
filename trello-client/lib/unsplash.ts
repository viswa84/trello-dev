// OLhhP_MyUMK_97TvSJNk_6qoGPQZrmy5NxcLrqmZDSA

import { createApi } from "unsplash-js";
export const unspalash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  fetch:fetch
});
