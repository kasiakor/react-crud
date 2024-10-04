import "./App.css";
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactQuery,
  useGetContactsQuery,
  useUpdateContactMutation,
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
      <AddContact />
    </div>
  );
}

export const ContactDetail = ({ id }: { id: string }) => {
  const { data } = useGetContactQuery(id);

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  // const { refetch } = useGetContactsQuery();

  const contact = {
    id: "5b2eee0a8fdd5b71c8148400",
    age: 22,
    name: "Campos York",
    gender: "male",
    company: "AVENETRO",
    email: "camposyork@avenetro.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const updatedContact = {
    id: "5b2eee0a8fdd5b71c8148400",
    age: 22,
    name: "Campos Yorki Updated",
    gender: "female",
    company: "AVENETRO",
    email: "camposyork@avenetro.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const addHandler = async () => {
    await addContact(contact);
    // refetch();
  };
  const updateHandler = async () => {
    await updateContact(updatedContact);
  };
  const deleteHandler = async () => {
    await deleteContact("5b2eee0a8fdd5b71c8148400");
  };

  console.log("contact", contact);
  return (
    <>
      <button onClick={addHandler}>Add Contact</button>
      <button onClick={updateHandler}>Update Contact</button>
      <button onClick={deleteHandler}>Delete Contact</button>
    </>
  );
};

export default App;
