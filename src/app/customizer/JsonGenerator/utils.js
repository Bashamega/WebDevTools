import { faker } from "@faker-js/faker";

export default class Categories {
  #categories = {
    Number: [
      { name: "bigint", func: faker.number.bigInt },
      { name: "binary", func: faker.number.binary },
      { name: "float", func: faker.number.float },
      { name: "hex", func: faker.number.hex },
      { name: "int", func: faker.number.int },
      { name: "octal", func: faker.number.octal },
    ],
    Lorem: [
      { name: "lines", func: faker.lorem.lines },
      { name: "paragraph", func: faker.lorem.paragraph },
      { name: "paragraphs", func: faker.lorem.paragraphs },
      { name: "sentence", func: faker.lorem.sentence },
      { name: "slug", func: faker.lorem.slug },
      { name: "text", func: faker.lorem.text },
      { name: "word", func: faker.lorem.word },
      { name: "words", func: faker.lorem.words },
    ],
    Person: [
      { name: "bio", func: faker.person.bio },
      { name: "firstName", func: faker.person.firstName },
      { name: "lastName", func: faker.person.lastName },
      { name: "middleName", func: faker.person.middleName },
      { name: "fullName", func: faker.person.fullName },
      { name: "gender", func: faker.person.gender },
      { name: "jobArea", func: faker.person.jobArea },
      { name: "jobDescriptor", func: faker.person.jobDescriptor },
      { name: "jobTitle", func: faker.person.jobTitle },
      { name: "jobType", func: faker.person.jobType },
    ],
    Location: [
      { name: "city", func: faker.location.city },
      { name: "country", func: faker.location.country },
      { name: "countryCode", func: faker.location.countryCode },
      { name: "county", func: faker.location.county },
      { name: "direction", func: faker.location.direction },
      { name: "latitude", func: faker.location.latitude },
      { name: "longitude", func: faker.location.longitude },
      { name: "state", func: faker.location.state },
      { name: "street", func: faker.location.street },
      { name: "streetAddress", func: faker.location.streetAddress },
      { name: "zipCode", func: faker.location.zipCode },
      { name: "buildingNumber", func: faker.location.buildingNumber },
      { name: "cardinalDirection", func: faker.location.cardinalDirection },
    ],
    Internet: [{ name: "email", func: faker.internet.email }],
  };

  getECategoriesArr() {
    return Object.keys(this.#categories);
  }

  getOptionNameArr(category) {
    return this.#categories[category]?.map((option) => option.name);
  }

  getOptionFunc(category, optionName) {
    const categoryData = this.#categories[category];
    const option = categoryData?.find(
      (specificOption) => specificOption.name === optionName,
    );

    return option?.func;
  }

  getCurrentSchema(fields) {
    const newMappedSchema = {};
    this.getECategoriesArr().map((category) => {
      fields.map((field) => {
        const mappedFunc = this.getOptionFunc(category, field.fieldType);
        if (mappedFunc) {
          newMappedSchema[field.fieldName] = mappedFunc;
        }
      });
    });
    return newMappedSchema;
  }

  isDataCached(currentRowsRequested, previousResponseData, mappedSchema) {
    return (
      // Check if a request has already been made for data (check for cached data)
      previousResponseData.length > 0 &&
      // Check if the requested data has changed from the previous data requested
      Object.keys(mappedSchema).sort().join(",") ==
        Object.keys(previousResponseData[0]).sort().join(",") &&
      // Check if the number of rows requested is the same as the number of rows in the previous request
      currentRowsRequested == previousResponseData.length
    );
  }
}
