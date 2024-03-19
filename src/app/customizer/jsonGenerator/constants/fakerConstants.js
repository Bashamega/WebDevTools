export const fakerListType = [
  // typeLabel represents the type of data that faker.js will generate. eg: for 'email', it will generate data focusing on email formats.
  // typedescription provides a description for the corresponding typeLabel.
  // function specifies the faker.js API function to use.
  // To add more types, refer to the faker.js API documentation. For instance, to add different cat breeds, you could use:
  // typeLabel: "Cat", (This is according to https://fakerjs.dev/api/animal.html#cat)
  // typedescription: "Generates a random cat breed",
  // function: "animal.cat"
  // For further details, see: https://fakerjs.dev/api/

  {
    typeLabel: "Email",
    typeDescription: "Generate a random email",
    function: "internet.email",
  },
  {
    typeLabel: "User Name",
    typeDescription: "Generate a random user name",
    function: "internet.userName",
  },
  {
    typeLabel: "Street Address",
    typeDescription: "Generate a street address",
    function: "location.streetAddress",
  },
  {
    typeLabel: "Date",
    typeDescription: "Generate a random date",
    function: "date.past",
  },
  {
    typeLabel: "Text",
    typeDescription: "Generate a random sentence",
    function: "lorem.sentence",
  },
  {
    typeLabel: "Name",
    typeDescription: "Generate a random person name",
    function: "person.firstName",
  },
  {
    typeLabel: "Phone Number",
    typeDescription: "Generate a random phone number",
    function: "phone.number",
  },
  {
    typeLabel: "Company Name",
    typeDescription: "Generate a random company name",
    function: "company.catchPhrase",
  },
  {
    typeLabel: "Product Name",
    typeDescription: "Generate a random product name",
    function: "commerce.productName",
  },
  {
    typeLabel: "Color",
    typeDescription: "Generate a random color",
    function: "color.human",
  },
  {
    typeLabel: "Name",
    typeDescription: "Generate a random person name",
    function: "person.firstName",
  },
];
