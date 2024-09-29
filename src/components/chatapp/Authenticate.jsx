import { auth, provider } from '../../../firebase-config'; // Adjust path as needed
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie'
const cookies = new Cookies();
export const Authenticate = (props) => {
    const {setIsAuth} = props;
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Sign-in successful:', result);
            cookies.set("auth-token",result.user.refreshToken);
            setIsAuth(true);
            // You can handle additional logic here, like redirecting the user or storing user info
        } catch (error) {
            console.error('Error during sign-in:', error);
            // Optionally, you can show a user-friendly error message here
        }
    };

    return (
        <div className="auth">
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
};
export default Authenticate;
