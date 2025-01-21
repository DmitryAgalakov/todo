namespace API.Extensions;

public static class Ex
{
    public static double DateTimeToJsDate(DateTime dt)
    {
        return dt.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds;
    }
}
