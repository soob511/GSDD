import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseJwt } from '../../../api/common';
import { SET_TOKEN } from '../../../reducers/tokenReducer';

const OauthRedirect = () => {
  let token = useLocation().search.split('=')[1];
  let role = parseJwt(token).roles[0].authority;
  let userId = parseJwt(token);
  // let email = parseJwt(token).sub;
  console.log(parseJwt(token));

  const action = {
    token,
    userId,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_TOKEN(action));

    console.log('role' + role);
    if (role === 'ROLE_USER') {
      localStorage.setItem('accessToken', token);
      window.location.href = '/';
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
