using System.Collections.Generic;
namespace QTPlugin
{
	/// <summary>
	/// Gives an access to Tab of QTTabBar
	/// </summary>
	public interface ITab
	{
		/// <summary>
		/// Browses back/forward if can.
		/// If this tab is locked, navigation will be occur in cloned tab.
		/// </summary>
		/// <param name="fBack"></param>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		bool Browse( bool fBack );

		/// <summary>
		/// Browses to specified address.
		/// If this tab is locked, navigation will be occur in cloned tab.
		/// </summary>
		/// <param name="address"></param>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		bool Browse( Address address );

		/// <summary>
		/// Inserts this tab to new position.
		/// </summary>
		/// <param name="index"></param>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		bool Insert( int index );

		/// <summary>
		/// Tries to close this tab.
		/// If this method returns true, any action to this tab will be discarded.
		/// 
		/// This closes even if locked.
		/// This fails in case the tab is the last one.
		/// </summary>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		bool Close();

		/// <summary>
		/// Creates a cloned tab at specified postion.
		/// </summary>
		/// <param name="index">
		/// zero based index of insertion position.
		/// if this parameter is -1, new tab will be inserted at user setting position.
		/// </param>
		/// <param name="fSelect">if set this true, cloned tab will be activated.</param>
		/// <returns></returns>
		void Clone( int index, bool fSelect );

		/// <summary>
		/// Gets tab history.
		/// </summary>
		/// <param name="fBack"></param>
		/// <returns></returns>
		Address[] GetHistory( bool fBack );

		/// <summary>
		/// Gets tab history branches.
		/// </summary>
		/// <returns></returns>
		Address[] GetBraches();

		/// <summary>
		/// Gets a Address structure that indicates location of this tab.
		/// 
		/// Address.Path can be an invalid as a file system path in case the tab location is 
		/// one of some kind of special folders or in an archive file, especially on XP.
		/// 
		/// Those path can not be used for navigation, so use Address.ITEMIDLIST instead.
		/// 
		/// Deprecated.
		/// </summary>
		Address Address
		{
			get;
		}

		/// <summary>
		/// Gets a path string that indicates location of this tab.(1.3.0.0)
		/// </summary>
		string Path
		{
			get;
		}

		/// <summary>
		/// Gets a ITEMIDLIST structure data that indicates location of this tab.(1.3.0.0)
		/// </summary>
		byte[] IDL
		{
			get;
		}

		/// <summary>
		/// Gets or sets tab display text.
		/// </summary>
		string Text
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets tab display sub text.
		/// </summary>
		string SubText
		{
			get;
			set;
		}

		/// <summary>
		/// Gets an index of tab.
		/// </summary>
		int Index
		{
			get;
		}

		/// <summary>
		/// Gets or sets a value indicating whether this tab is activated.
		/// Setting false does nothing.
		/// </summary>
		bool Selected
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a value indicating whether this tab is locked.
		/// </summary>
		bool Locked
		{
			get;
			set;
		}

		/// <summary>
		/// Retrieve an integer value that uniquely identifies the tab object.
		/// </summary>
		int ID
		{
			get;
		}

		/// <summary>
		/// Gets or sets selection in the current view.
		/// Fullpath strings can be set but only file name part is used and rest of the passed string is ignored.
		/// 
		/// return empty if failed.
		/// </summary>
		IList<string> SelectedPaths
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets selection in the current view.
		/// IDLs are relative to its parent.
		/// 
		/// return empty if failed.
		/// </summary>
		IList<byte[]> SelectedIDLs
		{
			get;
			set;
		}

		/// <summary>
		/// Number of items in the folder.
		/// </summary>
		int ItemCount
		{
			get;
		}

		/// <summary>
		/// Enumerates item paths in the folder. This property is implemented by using deferred execution.
		/// </summary>
		IEnumerable<string> ItemPaths
		{
			get;
		}

		/// <summary>
		/// Enumerates ITEMIDLISTs of items in the folder. This property is implemented by using deferred execution.
		/// </summary>
		IEnumerable<byte[]> ItemIDLs
		{
			get;
		}

		/// <summary>
		/// Gets the view where this tab resides.
		/// </summary>
		View View
		{
			get;
		}
	}
}
