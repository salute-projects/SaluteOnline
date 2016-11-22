namespace SaluteOnline.Domain.Extensions
{
    public static class StringExtensions
    {
        public static string EmptyIfNull(this string value)
        {
            return string.IsNullOrEmpty(value) ? string.Empty : value;
        }
    }
}