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
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
            .ForMember(dest => dest.Keywords, opt => opt.MapFrom(src => src.Keywords));

        CreateMap<SearchKeyword, SearchKeywordDto>();
        CreateMap<CreateSearchKeywordDto, SearchKeyword>();
    }
}
