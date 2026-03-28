"use client";

import { Suspense } from "react";
import Photos360Content from "./Photo360Content";

export default function Photos360Page() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Photos360Content />
    </Suspense>
  );
}