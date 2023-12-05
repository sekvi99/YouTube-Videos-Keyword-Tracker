using AutoMapper;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Models.Address;
using YouTubeKeywordTrackerAPI.Models.Authentication;
using YouTubeKeywordTrackerAPI.Models.Authentication.Roles;
using YouTubeKeywordTrackerAPI.Models.Data;

namespace YouTubeKeywordTrackerAPI.Mapper;

public class YouTubeKeywordTrackerMappingProfile : Profile
{
    public YouTubeKeywordTrackerMappingProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.addressStreet, opt => opt.MapFrom(src => src.Address.Street))
            .ForMember(dest => dest.addressCity, opt => opt.MapFrom(src => src.Address.City))
            .ForMember(dest => dest.adressPostalCode, opt => opt.MapFrom(src => src.Address.PostalCode));
        CreateMap<RoleCreateDto, Role>();
        CreateMap<Role, RoleDto>();
        CreateMap<SearchKeyword, SearchKeywordDto>();
        CreateMap<CreateSearchKeywordDto, SearchKeyword>();
        CreateMap<Address, AdressDto>();
    }
}
