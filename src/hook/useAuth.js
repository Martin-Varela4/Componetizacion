
export const useAuth = () => {


     const [token, setToken] = useState(localStorage.getItem("token"));

     const login = (email, password) => {
        const data = await api.post("/users/login", { email, password });

        const token = data.token;   

        setToken(data.token);
        localStorage.setItem("token", data.token);
     



        return {token, setToken, login, logout }


}}