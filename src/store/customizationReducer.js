  // project imports
  import config from 'config';

  // action - state management
  import * as actionTypes from './actions';

  export const initialState = {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    isLoggedIn:false,
    isAuthAdmin:false,
    members:[]
  };

  // ==============================|| CUSTOMIZATION REDUCER ||============================== //

  const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
      case actionTypes.MENU_OPEN:
        id = action.id;
        return {
          ...state,
          isOpen: [id]
        };
      case actionTypes.SET_MENU:
        return {
          ...state,
          opened: action.opened
        };
      case actionTypes.LOGGED_IN:
        return {
          ...state,
          isLoggedIn:true
        };
      case actionTypes.LOGGED_OUT:
        return {
          ...state,
          isLoggedIn:false
        };
        case actionTypes.ADMIN_OR_NOT:
        return{
          ...state,
          isAuthAdmin:true
        }
        case actionTypes.USER_OR_NOT:
        return{
          ...state,
          isAuthAdmin:false
        }
      case actionTypes.SET_FONT_FAMILY:
        return {
          ...state,
          fontFamily: action.fontFamily
        };
      case actionTypes.SET_BORDER_RADIUS:
        return {
          ...state,
          borderRadius: action.borderRadius
        };
      case actionTypes.ORG_MEM:
        return {
          ...state,
          members:  action.payload
        };
      default:
        return state;
    }
  };

  export default customizationReducer;
