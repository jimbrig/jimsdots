using System.Drawing;

namespace QTPlugin
{
	/// <summary>
	/// Implement this interface when your plugin client wants to support flexible image sizes, which is introduced in QTTabBar ver 512.
	/// </summary>
	public interface IPluginItemWithImage
	{
		/// <summary>
		/// Gets an item image of specified size.
		/// 
		/// This call follows typically IBarButton.GetImage method. 
		/// QTTabBar creates a copy of the returned image so implementor is responsibile for disposing it.
		/// QTTabBar resizes when returned image is not of the specified size.
		/// This can be skipped if user has specified an image for the button.
		/// 
		/// If you implement this, your plugin will work only on version 512 and later.
		/// </summary>
		/// <param name="size">Image size that QTTabBar wants. This can be 16, 24, 32, 48, or 256.</param>
		/// <param name="index">Item index of which image is required. If the object is not IBarMultipleCustomItems, this value has no meaning.</param>
		/// <returns></returns>
		Image GetItemImage( int size, int index = 0 );
	}
}