import { useAppSelector } from '../../app/hooks';

export default function Loader() {
  const isLoading = useAppSelector((state) => state.settings.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loader-overlay">
      <div className="loader" />
    </div>
  );
}
