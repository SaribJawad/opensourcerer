import { LoadingSpinner } from "../_components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner size={40} />
    </div>
  );
}
