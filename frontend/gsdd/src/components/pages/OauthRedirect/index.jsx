import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseJwt } from '../../../api/common';
import { SET_TOKEN } from '../../../reducers/tokenReducer';
import apiPath from '../../../api/apiPath';
import { authAxios } from '../../../api/common';
import { SET_USER } from '../../../reducers/userReducer';

const OauthRedirect = () => {
  let token = useLocation().search.split('=')[1];
  let role = parseJwt(token).roles[0].authority;
  let userId = parseJwt(token).id;
  // let email = parseJwt(token).sub;
  console.log(parseJwt(token));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = {
    token,
    userId,
  };

  useEffect(() => {
    try {
      const getUserData = async (userId) => {
        await authAxios
          .get(apiPath.mypage.get(userId), {})
          .then((res) => {
            console.log(res.data);
            dispatch(SET_USER(res.data));
          })
          .catch((err) => console.log(err));
      };
      getUserData(userId);
    } catch (e) {
      console.log(e);
    }
    dispatch(SET_TOKEN(data));

    console.log('role' + role);
    if (role === 'ROLE_USER') {
      localStorage.setItem('accessToken', token);
      navigate('/');
    } else {
      navigate('/process', {
        state: token,
      });
    }

    // dispatch(setEmail(email));
  });

  return (
    <div>
      <h1>wait</h1>
    </div>
  );
};

export default OauthRedirect;
