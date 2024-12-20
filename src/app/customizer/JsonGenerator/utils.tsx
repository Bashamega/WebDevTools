// import { faker } from "@faker-js/faker";

// export default class Categories {
//   categories = {
//     Number: [
//       { name: "bigint", func: faker.number.bigInt },
//       { name: "binary", func: faker.number.binary },
//       { name: "float", func: faker.number.float },
//       { name: "hex", func: faker.number.hex },
//       { name: "int", func: faker.number.int },
//       { name: "octal", func: faker.number.octal },
//     ],
//     Lorem: [
//       { name: "lines", func: faker.lorem.lines },
//       { name: "paragraph", func: faker.lorem.paragraph },
//       { name: "paragraphs", func: faker.lorem.paragraphs },
//       { name: "sentence", func: faker.lorem.sentence },
//       { name: "slug", func: faker.lorem.slug },
//       { name: "text", func: faker.lorem.text },
//       { name: "word", func: faker.lorem.word },
//       { name: "words", func: faker.lorem.words },
//     ],
//     Person: [
//       { name: "bio", func: faker.person.bio },
//       { name: "firstName", func: faker.person.firstName },
//       { name: "lastName", func: faker.person.lastName },
//       { name: "middleName", func: faker.person.middleName },
//       { name: "fullName", func: faker.person.fullName },
//       { name: "gender", func: faker.person.gender },
//       { name: "jobArea", func: faker.person.jobArea },
//       { name: "jobDescriptor", func: faker.person.jobDescriptor },
//       { name: "jobTitle", func: faker.person.jobTitle },
//       { name: "jobType", func: faker.person.jobType },
//     ],
//     Location: [
//       { name: "city", func: faker.location.city },
//       { name: "country", func: faker.location.country },
//       { name: "countryCode", func: faker.location.countryCode },
//       { name: "county", func: faker.location.county },
//       { name: "direction", func: faker.location.direction },
//       { name: "latitude", func: faker.location.latitude },
//       { name: "longitude", func: faker.location.longitude },
//       { name: "state", func: faker.location.state },
//       { name: "street", func: faker.location.street },
//       { name: "streetAddress", func: faker.location.streetAddress },
//       { name: "zipCode", func: faker.location.zipCode },
//       { name: "buildingNumber", func: faker.location.buildingNumber },
//       { name: "cardinalDirection", func: faker.location.cardinalDirection },
//     ],
//     Internet: [{ name: "email", func: faker.internet.email }],
//   };

//   getECategoriesArr() {
//     return Object.keys(this.categories);
//   }

//   getOptionNameArr(category: keyof typeof this.categories): string[] {
//     return this.categories[category]?.map((option) => option.name);
//   }

//   getOptionFunc(category: keyof typeof this.categories, optionName: string): (() => any) | undefined {
//     const categoryData = this.categories[category];
//     if (!categoryData) return undefined;
//     const option = categoryData.find(
//       (specificOption) => specificOption.name === optionName,
//     );

//     return option?.func;
//   }

//   getCurrentSchema(fields: { fieldName: string; fieldType: string }[]) {
//     const newMappedSchema: { [key: string]: () => any } = {};
//     this.getECategoriesArr().map((category) => {
//       fields.map((field) => {
//         const mappedFunc = this.getOptionFunc(category as keyof typeof this.categories, field.fieldType);
//         if (mappedFunc) {
//           newMappedSchema[field.fieldName] = mappedFunc;
//         }
//       });
//     });
//     return newMappedSchema;
//   }
// }

// interface Option {
//   name: string;
//   func: () => any;
// }

// interface CategoriesType {
//   Number: Option[];
//   Lorem: Option[];
//   Person: Option[];
//   Location: Option[];
//   Internet: Option[];
// }

// function getCurrentSchema(fields: any) {
//   throw new Error("Function not implemented.");
// }
//     const newMappedSchema: { [key: string]: () => any } = {};
//     this.getECategoriesArr()?.map((category: keyof CategoriesType) => {
//       fields.map((field: { fieldName: string; fieldType: string }) => {
//       const mappedFunc = this.getOptionFunc(category, field.fieldType);
//       if (mappedFunc) {
//         newMappedSchema[field.fieldName] = mappedFunc;
//       }
//       });
//     });
//     return newMappedSchema;
//   }

//   isDataCached(currentRowsRequested, previousResponseData, mappedSchema) {
//     // Ensure previousResponseData is valid and has data to compare
//     if (
//       !previousResponseData ||
//       previousResponseData.length === 0 ||
//       !mappedSchema
//     ) {
//       return false;
//     }

//     // Serialize the schema and the cached data structure for comparison
//     const previousSchema = Object.entries(previousResponseData[0])
//       .map(([key, value]) => [key, typeof value])
//       .sort()
//       .join(",");
//     const currentSchema = Object.entries(mappedSchema)
//       .map(([key, value]) => [key, typeof value()])
//       .sort()
//       .join(",");

//     return (
//       // Check if the schema (keys and types) matches
//       previousSchema === currentSchema &&
//       // Check if the number of rows requested is the same as the number of rows in the previous request
//       currentRowsRequested === previousResponseData.length
//     );
//   }

// function getCurrentSchema(fields: any) {
//   throw new Error("Function not implemented.");
// }

import { faker } from "@faker-js/faker";

// Define the Option interface
interface Option {
  name: string;
  func: () => any;
}

// Define the structure for categories
interface CategoriesType {
  Number: Option[];
  Lorem: Option[];
  Person: Option[];
  Location: Option[];
  Internet: Option[];
}

// Define the FieldsType for schema input
interface FieldType {
  fieldName: string;
  fieldType: string;
}

interface CategoryData {
  getOptionNameArr: (category: keyof CategoriesType) => string[];
  getECategoriesArr: () => string[];
  getCurrentSchema: (fields: FieldType[]) => { [key: string]: () => any };
  isDataCached: (
    numRows: number,
    responseData: any[],
    schema: { [key: string]: () => any },
  ) => boolean;
}

export default class Categories implements CategoryData {
  categories: CategoriesType = {
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

  // Get category names
  getECategoriesArr(): string[] {
    return Object.keys(this.categories);
  }

  // Get option names in a category
  getOptionNameArr(category?: keyof CategoriesType): string[] {
    if (!category) {
      return []; // Return an empty array or handle the case where no category is provided
    }
    return this.categories[category]?.map((option) => option.name) || [];
  }

  // Get function of a specific option
  getOptionFunc(
    category: keyof CategoriesType,
    optionName: string,
  ): (() => any) | undefined {
    const categoryData = this.categories[category];
    return categoryData?.find((option) => option.name === optionName)?.func;
  }

  // Build schema based on fields
  getCurrentSchema(fields: FieldType[]): { [key: string]: () => any } {
    const newMappedSchema: { [key: string]: () => any } = {};

    fields.forEach((field) => {
      this.getECategoriesArr().forEach((category) => {
        const mappedFunc = this.getOptionFunc(
          category as keyof CategoriesType,
          field.fieldType,
        );
        if (mappedFunc) {
          newMappedSchema[field.fieldName] = mappedFunc;
        }
      });
    });

    return newMappedSchema;
  }

  // Check if data is cached
  isDataCached(
    currentRowsRequested: number,
    previousResponseData: any[],
    mappedSchema: { [key: string]: () => any },
  ): boolean {
    if (
      !previousResponseData ||
      previousResponseData.length === 0 ||
      !mappedSchema
    ) {
      return false;
    }

    const previousSchema = Object.entries(previousResponseData[0])
      .map(([key, value]) => [key, typeof value])
      .sort()
      .join(",");

    const currentSchema = Object.entries(mappedSchema)
      .map(([key, value]) => [key, typeof value()])
      .sort()
      .join(",");

    return (
      previousSchema === currentSchema &&
      currentRowsRequested === previousResponseData.length
    );
  }
}
