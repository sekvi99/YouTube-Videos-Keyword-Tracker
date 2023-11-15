using AutoMapper;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Models.Authentication;
using YouTubeKeywordTrackerAPI.Models.Data;

namespace YouTubeKeywordTrackerAPI.Mapper;

public class YouTubeKeywordTrackerMappingProfile : Profile
{
    public YouTubeKeywordTrackerMappingProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(m => m.City, a => a.MapFrom(s => s.Address.City))
            .ForMember(m => m.Street, a => a.MapFrom(s => s.Address.Street))
            .ForMember(m => m.PostalCode, a => a.MapFrom(s => s.Address.PostalCode));

        CreateMap<SearchKeyword, SearchKeywordDto>();
        CreateMap<CreateSearchKeywordDto, SearchKeyword>();
    }
}
