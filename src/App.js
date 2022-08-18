import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка  при получении пользователей");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  const onCLickInvate = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true)
  }
  return (
    <div className="App">
      {
        success ? <Success count={invites.length} /> : <Users
          searchValue={searchValue}
          items={users}
          IsLoading={setIsLoading}
          invites={invites}
          onCLickInvate={onCLickInvate}
          onChangeSearchValue={onChangeSearchValue}
          onClickSendInvites={ onClickSendInvites}
        />
      }
    </div>
  );
}

export default App;
