using System;

namespace QTPlugin
{
	/// <summary>
	/// New in 1.0.1.0
	/// Implement this abstract class and give the Type object of it to constructor of PluginAttribute.
	/// 
	/// You can provide localized strings on execution time using CultureInfo.CurrentCulture.
	/// Implementing class needs to have default constructor (a constructor without arguments).
	/// </summary>
	public abstract class LocalizedStringProvider
	{
		/// <summary>
		/// Use this method to know which plugin type is being instancialized in Assembly that contains multiple plugin classes.
		/// If your assembly has just one plugin class, ignore this.
		/// 
		/// It's guaranteed that this call precedes getting Name, Author and Description.
		/// See PluginAttribute..ctor( PluginType, Type, int ).
		/// </summary>
		/// <param name="iKey"></param>
		public abstract void SetKey( int iKey );

		/// <summary>
		/// Return display name.
		/// </summary>
		public abstract string Name
		{
			get;
		}

		/// <summary>
		/// 
		/// </summary>
		public abstract string Author
		{
			get;
		}

		/// <summary>
		/// 
		/// </summary>
		public abstract string Description
		{
			get;
		}
	}

	/// <summary>
	/// New in 1.0.1.3
	/// Implement this abstract class and give the Type object of it to constructor of PluginAttribute.
	/// 
	/// You can provide localized strings on execution time using CultureInfo.CurrentCulture.
	/// Implementing class needs to have default constructor (a constructor without arguments).
	/// </summary>
	public abstract class LocalizedStringProvider2 : LocalizedStringProvider
	{
		/// <summary>
		/// 
		/// </summary>
		public abstract string SupportURL
		{
			get;
		}

		/// <summary>
		/// 
		/// </summary>
		public abstract DateTime LastUpdate
		{
			get;
		}
	}

	// to do, tooltip string
}