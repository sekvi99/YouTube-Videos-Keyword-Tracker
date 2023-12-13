using PdfSharp.Fonts;

namespace YouTubeKeywordTrackerAPI.Helpers;

public class CustomFontResolver : IFontResolver
{
    public byte[] GetFont(string faceName)
    {
        using (var ms = new MemoryStream())
        {
            using (var fontFileStream = new FileStream("Arial.ttf", FileMode.Open, FileAccess.Read))
            {
                fontFileStream.CopyTo(ms);
            }
            return ms.ToArray();
        }
    }

    public FontResolverInfo ResolveTypeface(string familyName, bool isBold, bool isItalic)
    {
        var fontResolverInfo = new FontResolverInfo("Arial.ttf");
        return fontResolverInfo;
    }
}
