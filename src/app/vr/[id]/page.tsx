import { getProperty } from "@/lib/properties";
import { notFound } from "next/navigation";
import VRViewer from "@/components/VRViewer";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VRViewerPage({ params }: Props) {
  const { id } = await params;
  const property = getProperty(id);

  if (!property) notFound();

  return <VRViewer property={property} />;
}
