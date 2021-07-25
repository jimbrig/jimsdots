using System;
using QTPlugin.Interop;

namespace QTPlugin
{
	/// <summary>
	/// Represents the method that will handle an event for IPluginServer.
	/// </summary>
	/// <param name="sender"></param>
	/// <param name="e"></param>
	public delegate void PluginEventHandler( object sender, PluginEventArgs e );

	/// <summary>
	/// Represents the method that will handle a key event for IPluginServer.
	/// </summary>
	/// <param name="sender"></param>
	/// <param name="e"></param>
	public delegate void PluginKeyEventHandler( object sender, PluginKeyEventArgs e );

	/// <summary>
	/// Provides data for IPluginServer events. 
	/// </summary>
	public class PluginEventArgs : EventArgs
	{
		private int index;
		private Address address;
		private ExplorerWindowActions windowAction;

		/// <summary>
		/// 
		/// </summary>
		/// <param name="index"></param>
		/// <param name="address"></param>
		public PluginEventArgs( int index, Address address )
		{
			this.index = index;
			this.address = address;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="windowAction"></param>
		public PluginEventArgs( ExplorerWindowActions windowAction )
		{
			this.windowAction = windowAction;
		}

		/// <summary>
		/// Tab index.
		/// 
		/// On SettingsChanged, 0 is passed when global option changed and 1 when ButtonBar option changed.
		/// </summary>
		public int Index
		{
			get
			{
				return this.index;
			}
		}

		/// <summary>
		/// Tab address.
		/// </summary>
		public Address Address
		{
			get
			{
				return this.address;
			}
		}

		/// <summary>
		/// Explorer window actions. only used by ExplorerStateChanged event.
		/// </summary>
		public ExplorerWindowActions WindowAction
		{
			get
			{
				return this.windowAction;
			}
		}

		/// <summary>
		/// View that the event is associated to.
		/// </summary>
		public View View
		{
			get;
			set;
		}
	}

	/// <summary>
	/// Provides data for IPluginServer key events. (1.0.1.3)
	/// </summary>
	public class PluginKeyEventArgs : System.Windows.Forms.KeyEventArgs
	{
		private int index;
		private bool fRepeat;

		/// <summary>
		/// Instantialize PluginKeyEventArgs
		/// </summary>
		/// <param name="keyData"></param>
		/// <param name="index"></param>
		/// <param name="fRepeat"></param>
		public PluginKeyEventArgs( System.Windows.Forms.Keys keyData, int index, bool fRepeat )
			: base( keyData )
		{
			this.index = index;
			this.fRepeat = fRepeat;
		}

		/// <summary>
		/// Indicates whether the key is pressed before this event.
		/// </summary>
		public bool Repeat
		{
			get
			{
				return this.fRepeat;
			}
		}

		/// <summary>
		/// Retrieves the index number of the performed keyboard shortcut provided by the plugin on QueryShortcutKeys method call.
		/// </summary>
		public int Index
		{
			get
			{
				return this.index;
			}
		}
	}
}