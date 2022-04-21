import { EntityRepository, FindConditions, Repository, ILike } from 'typeorm';
import axios from 'axios';
import { validate as isValidUUID } from 'uuid';

import Venue from '../entitites/entry.entity';
import { NotFoundException } from '@nestjs/common';
import { VenuePatchResponseDto } from '../testapi/dto/venue.patch.response.dto';

@EntityRepository(Venue)
export class LocalRepository extends Repository<any> {
  async addVenue(body): Promise<any> {
    const createdPost = this.create(body);

    return this.save(createdPost);
  }

  async getAll(): Promise<any> {
    const venues = await this.find();
    const data = await this.getAllThirdParty();

    if (!data.data?.error) {
      return { venues, data };
    } else {
      return venues;
    }
  }

  async getAllThirdParty() {
    try {
      const { data } = await axios.get('https://api.artic.edu/api/v1/artworks');

      return data.data;
    } catch (error) {
      return error.response;
    }
  }

  async getById(id): Promise<any> {
    if (isValidUUID(id)) {
      const venue = await this.find({
        where: { id: id },
      });

      if (!venue.length) {
        throw new NotFoundException('Entity was not found by this id');
      }

      return venue;
    } else {
      return await this.getThirdPartyById(id);
    }
  }

  async getThirdPartyById(id): Promise<any> {
    try {
      const { data } = await axios.get(
        `https://api.artic.edu/api/v1/artworks/${id}`,
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async getByQuery(query): Promise<any> {
    const where: FindConditions<Venue> = {
      city: ILike(`%${query?.city}%`),
      email: ILike(`%${query?.email}%`),
    };

    where.city['_value'] != '%undefined%' || delete where.city;
    where.email['_value'] != '%undefined%' || delete where.email;

    const venues = await this.find({
      where,
    });

    return venues;
  }

  async patchVenue(id, body): Promise<VenuePatchResponseDto> {
    try {
      return this.update(id, body);
    } catch (err) {
      throw new Error(err);
    }
  }
}
