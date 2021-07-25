using System;

namespace QTPlugin
{
	/// <summary>
	/// Specifies the informations about plugin.
	/// </summary>
	[AttributeUsage( AttributeTargets.Class )]
	public sealed class PluginAttribute : Attribute
	{
		/// <summary>
		/// Can be a nickname.
		/// </summary>
		public string Author;

		/// <summary>
		/// Name of the plugin. 
		/// </summary>
		public string Name;

		/// <summary>
		/// Version string like "1.0.0.0". 
		/// Asssembly version is used instead if unspecified.
		/// </summary>
		public string Version;

		/// <summary>
		/// Description of the plugin. shown in Option -> Plugin
		/// </summary>
		public string Description;

		/// <summary>
		/// Interactive, Background, etc.
		/// </summary>
		public PluginType PluginType;

		/// <summary>
		/// Author's web page, etc.
		/// New in 1.0.1.3
		/// </summary>
		public string SupportURL;

		/// <summary>
		/// The last update date in UTC.
		/// New in 1.0.1.3
		/// 
		/// Assembly file time stamp is used instead if empty.
		/// </summary>
		public DateTime LastUpdate;

		/// <summary>
		/// Options applied to the plugin.
		/// This is not currently used.
		/// If you specify this, your plugin will work only on version 512 and later.
		/// </summary>
		public PluginOptions Options
		{
			get;
			set;
		}



		/// <summary>
		/// </summary>
		/// <param name="pluginType">Plugin type. Interactive or Background.</param>
		public PluginAttribute( PluginType pluginType )
		{
			this.PluginType = pluginType;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="pluginType"></param>
		/// <param name="name"></param>
		/// <param name="author"></param>
		/// <param name="version"></param>
		/// <param name="description"></param>
		public PluginAttribute( PluginType pluginType, string name, string author, string version, string description )
		{
			this.PluginType = pluginType;
			this.Name = name;
			this.Author = author;
			this.Version = version;
			this.Description = description;
		}

		/// <summary>
		/// New in 1.0.1.3
		/// </summary>
		/// <param name="pluginType"></param>
		/// <param name="name"></param>
		/// <param name="author"></param>
		/// <param name="version"></param>
		/// <param name="description"></param>
		/// <param name="supportURL"></param>
		/// <param name="lastUpdate"></param>
		public PluginAttribute( PluginType pluginType, string name, string author, string version, string description, string supportURL, DateTime lastUpdate )
			: this( pluginType, name, author, version, description )
		{
			this.SupportURL = supportURL;
			this.LastUpdate = lastUpdate;
		}

		/// <summary>
		/// New in 1.0.1.0
		/// Create strings on execution time.
		/// 
		/// (recommended)
		/// </summary>
		/// <param name="pluginType">PluginType enum.</param>
		/// <param name="tProvider">Type of the class which implements LocalizedStringProvider.</param>
		/// <param name="iKey">
		/// Plugin index in the plugin assembly. 
		/// This is passed to LocalizedStringProvider.SetKey() method in this constructor.
		/// </param>
		public PluginAttribute( PluginType pluginType, Type tProvider, int iKey )
		{
			this.PluginType = pluginType;

			if( tProvider.IsSubclassOf( typeof( LocalizedStringProvider ) ) )
			{
				try
				{
					LocalizedStringProvider provider = (LocalizedStringProvider)Activator.CreateInstance( tProvider );
					provider.SetKey( iKey );
					this.Author = provider.Author;
					this.Name = provider.Name;
					this.Description = provider.Description;

					LocalizedStringProvider2 provider2 = provider as LocalizedStringProvider2;
					if( provider2 != null )
					{
						this.SupportURL = provider2.SupportURL;
						this.LastUpdate = provider2.LastUpdate;
					}
				}
				catch( MissingMethodException )
				{
					this.Author = String.Empty;
					this.Name = "Name missing";
					this.Description = "Default constuctor of LocalizedStringProvider is missing. \nContact the author of this plugin.";
				}
			}
			else
			{
				this.Author = String.Empty;
				this.Name = "Name missing";
				this.Description = "The type is not subclass of LocalizedStringProvider. \nContact the author of this plugin.";
			}
		}

		/// <summary>
		/// New in 1.0.1.0
		/// Create strings on execution time.
		/// </summary>
		/// <param name="pluginType"></param>
		/// <param name="tProvider"></param>
		public PluginAttribute( PluginType pluginType, Type tProvider )
			: this( pluginType, tProvider, -1 )
		{
		}
	}
}
