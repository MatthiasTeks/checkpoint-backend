import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries() {
    return Country.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string) {
    return Country.findOne({ where: { code } });
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg("continentCode") continentCode: string) {
    return Country.find({ where: { continentCode } });
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode") continentCode: string
  ): Promise<Country> {
    let country = Country.create({ code, name, emoji, continentCode });
    await country.save();
    return country;
  }
}