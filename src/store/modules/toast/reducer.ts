import { produce } from 'immer';

type ToastActionShow = {
  type: '@toast/SHOW';
  payload: {
    type: string;
    message: string;
    iconName: string;
    duration: number;
  };
};

type ToastActionHide = {
  type: '@toast/HIDE';
};

type ToastAction = ToastActionShow | ToastActionHide;

const INITIAL_STATE = {
  type: null as string | null,
  message: null as string | null,
  show: false,
  duration: 4000,
  iconName: '',
};

export function toast(state = INITIAL_STATE, action: ToastAction) {
  return produce(state, draft => {
    switch (action.type) {
      case '@toast/SHOW': {
        draft.type = action.payload.type;
        draft.message = action.payload.message;
        draft.iconName = action.payload.iconName;
        draft.duration = action.payload.duration;
        draft.show = true;
        break;
      }
      case '@toast/HIDE': {
        draft.type = null;
        draft.message = null;
        draft.duration = 4000;
        draft.iconName = '';
        draft.show = false;
        break;
      }
      default:
    }
  });
}
