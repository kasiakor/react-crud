import "./App.css";
import {
  useGetContactQuery,
  useGetContactsQuery,
} from "./services/contactsApi";

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
                  {/* <div>{contact.name}</div>
                  <div>{contact.name}</div>
                  <div>{contact.age}</div>
                  <div>{contact.company}</div>
                  <div>{contact.gender}</div>
                  <div>{contact.email}</div> */}
                  <img alt="face" src={contact.photo} />
                  <span>
                    <ContactDetail id={contact.id} />
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export const ContactDetail = ({ id }: { id: string }) => {
  const { data } = useGetContactQuery(id);

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export default App;
