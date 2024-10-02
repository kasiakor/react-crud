import "./App.css";
import { useGetContactsQuery } from "./services/contactsApi";

function App() {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetContactsQuery();
  return (
    <div className="App">
      <div>
        <h1>React Redux RTK Query in use</h1>
        {isLoading && <h2>...Loading</h2>}
        {isFetching && <h2>...Fetching</h2>}
        {error && <h2>Something went wrong</h2>}
        {isSuccess && (
          <div>
            {data?.map((contact) => {
              return (
                <div key={contact.id}>
                  <div>{contact.name}</div>
                  <div>{contact.name}</div>
                  <div>{contact.age}</div>
                  <div>{contact.company}</div>
                  <div>{contact.gender}</div>
                  <div>{contact.email}</div>
                  <img alt="face" src={contact.photo} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
