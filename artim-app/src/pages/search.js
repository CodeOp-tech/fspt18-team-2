import PublicSearch from '../components/PublicSearch';
import { useAuth } from "../components/AuthContext";




export default function search() {
  const { isLogged } = useAuth();
  
  return (
    <div>

      <PublicSearch />

    </div>
  );
}
