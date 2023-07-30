import { useParams, Navigate } from "react-router-dom";

import LoginForm from "../../components/layout/public/LoginForm";

import { assertUserOrOwner } from "../../utils/assertions";

interface RouteParams {
  userType?: string;
}

const Login: React.FC = () => {
  const { userType } = useParams() as RouteParams;

  try {
    assertUserOrOwner(userType);
  } catch (err) {
    return <Navigate to="/login/user" />;
  }

  return <LoginForm userType={userType} />;
};

export default Login;
