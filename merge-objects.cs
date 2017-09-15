public T MergeObjects<T>(T obj1, T obj2)
{
	var objResult = Activator.CreateInstance(typeof(T));
	var allProperties = typeof(T).GetProperties().Where(x => x.CanRead && x.CanWrite);
	foreach (var pi in allProperties)
	{
		object defaultValue;
		if (pi.PropertyType.IsValueType)
		{
			defaultValue = Activator.CreateInstance(pi.PropertyType);
		}
		else
		{
			defaultValue = null;
		}

		var value = pi.GetValue(obj2, null);

		if (value != defaultValue)
		{
			pi.SetValue(objResult, value, null);
		}
		else
		{
			value = pi.GetValue(obj1, null);

			if (value != defaultValue)
			{
				pi.SetValue(objResult, value, null);
			}
		}
	}
	return (T)objResult;
}