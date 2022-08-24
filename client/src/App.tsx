import {BrowserRouter as Router} from 'react-router-dom';

import Login from "./components/Login";
import {useSearchParams} from 'react-router-dom';
import Dashboard from "./components/Dashboard";

export default function App() {
  const [searchParams,setSearchParams]=useSearchParams();
  const code = searchParams.get('code');


  return code?<Dashboard code={code}/>:<Login />;
}


