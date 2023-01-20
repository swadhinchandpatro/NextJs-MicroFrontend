import dynamic from "next/dynamic";

export default function nextDynamicImport(module: string) {
  return dynamic(
    () =>
      import("component-library/packages/ui-library/").then(
        (mod: any) => mod[module]
      ) as Promise<React.FC<any>>,
    {
      ssr: false,
    }
  );
}