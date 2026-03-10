import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeErrorModal } from '../../store/settings/settingsSlice';
import AppButton from '../../ui/AppButton/AppButton';

export default function ErrorModal() {
  const dispatch = useAppDispatch();
  const { errorMessage, isErrorModalOpen } = useAppSelector((state) => state.settings);

  if (!isErrorModalOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Ошибка сервера</h3>
        <p>{errorMessage}</p>
        <AppButton type="button" onClick={() => dispatch(closeErrorModal())}>Закрыть</AppButton>
      </div>
    </div>
  );
}
